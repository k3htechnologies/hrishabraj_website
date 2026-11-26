import { apiClient } from '@/app/http/api-client';
import type { ApiResponse } from '@/app/http/types';
import { createQueryParams } from '@/shared/utils/createQueryParams';
import type { ApplicationFormSubmitResponse, JobOpeningResponse } from '../api/careersresponse';
import { ApplicationFormApi } from '../api/careers.api';
import type { JobSearchRequest } from '../api/careers.resquest';

export const ApplicationFormService = {
  apiCallFetchJobListing: async (request: JobSearchRequest) => {
    const recordRequest = Object.fromEntries(
      Object.entries(request).map(([key, value]) => [key, value])
    );
    const queryParams = createQueryParams(recordRequest);
    return apiClient.get<JobOpeningResponse>(
      `${ApplicationFormApi.PULL_JOBS}?${queryParams}`
    );
  },
  apiCallApplicationSubmit: async (
    formData: FormData
  ): Promise<ApiResponse<ApplicationFormSubmitResponse>> => {
    return apiClient.post<ApplicationFormSubmitResponse>(
      `${ApplicationFormApi.SUBMIT_APPLICATION}`,
      formData
    );
  },
};
