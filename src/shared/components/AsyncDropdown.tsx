
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';

export interface DropdownOption {
  id: string;
  label: string;
  subtitle?: string;
}
interface LoadOptionsParams {
  page: number;
  pageSize: number;
  keyword: string;
}

export interface LoadOptionsResult {
  data: DropdownOption[];
  totalRecords: number;
}

interface AsyncDropdownProps {
  label?: string;
  placeholder?: string;
  value?: DropdownOption | null;
  defaultValue?: DropdownOption | null;
  mandatory?: boolean;
  error?: string;
  onChange?: (option: DropdownOption) => void;
  disabled?: boolean;
  pageSize?: number;
  loadOptions: (obj: LoadOptionsParams) => Promise<LoadOptionsResult>;
}

const PAGE_SIZE = 10;
export default function AsyncDropdown({
  label,
  placeholder = 'Select...',
  value,
  onChange,
  disabled,
  loadOptions,
  mandatory = false,
  defaultValue = null,
  error,
}: AsyncDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    defaultValue ?? null
  );
  const selected = value ?? selectedOption;
  const totalRecords = useRef(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const load = async (pageToLoad: number, keyword = '', reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await loadOptions({
        page: pageToLoad,
        pageSize: PAGE_SIZE,
        keyword,
      });
      totalRecords.current = response.totalRecords;
      setHasMore(pageToLoad * PAGE_SIZE < response.totalRecords);
      setOptions((prev) =>
        reset ? response.data : [...prev, ...response.data]
      );
      setPage(pageToLoad);
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelectedOption(value);
    }
  }, [value]);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [open]);

  const select = (option: DropdownOption) => {
    if (value === undefined) {
      setSelectedOption(option);
    }
    onChange?.(option);
    setOpen(false);
    setSearch('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((prev) => Math.min(prev + 1, options.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (options[highlighted]) {
        select(options[highlighted]);
      }
    }
  };

  useEffect(() => {
    if (!open) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          load(page + 1, search);
        }
      },
      {
        threshold: 1,
      }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [page, loading, hasMore, search, open]);

  return (
    <div ref={containerRef} className="field async-dropdown">
      {label && (
        <label>
          {label}
          {mandatory && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (next && !initialized) {
              load(1, '', true);
            }
            return next;
          });
        }}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        className={`async-dropdown__trigger ${error ? 'async-dropdown__trigger--error' : ''
          }`}
      >
        <span className={selected ? '' : 'async-dropdown__placeholder'}>
          {selected?.label ?? placeholder}
        </span>

        {!disabled && (
          <span
            className={`async-dropdown__arrow ${open ? 'async-dropdown__arrow--open' : ''
              }`}
          />
        )}
      </button>

      {open && (
        <div className="async-dropdown__menu">
          <div className="async-dropdown__search">
            <input
              ref={searchInputRef}
              value={search}
              onChange={(e) => {
                const keyword = e.target.value;
                setSearch(keyword);
                setHighlighted(0);
                load(1, keyword, true);
              }}
              placeholder="Search..."
            />
          </div>

          <div
            data-lenis-prevent
            className="async-dropdown__options"
          >
            {!loading && options.length === 0 && (
              <div className="async-dropdown__message">
                No results found
              </div>
            )}

            {loading && options.length === 0 && (
              <div className="async-dropdown__message">
                Loading...
              </div>
            )}

            {options.map((option, index) => (
              <button
                type="button"
                key={option.id}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => select(option)}
                className={`async-dropdown__option ${highlighted === index
                    ? 'async-dropdown__option--active'
                    : ''
                  }`}
              >
                <span>
                  <span className="async-dropdown__option-label">
                    {option.label}
                  </span>

                  {option.subtitle && (
                    <span className="async-dropdown__option-subtitle">
                      {option.subtitle}
                    </span>
                  )}
                </span>

                {selected?.id === option.id && (
                  <span className="async-dropdown__selected">✓</span>
                )}
              </button>
            ))}

            {loading && options.length > 0 && (
              <div className="async-dropdown__message">
                Loading more...
              </div>
            )}

            <div ref={loadMoreRef} />
          </div>
        </div>
      )}

      {error && (
        <p className="field-error">{error}</p>
      )}
    </div>
  );

}
