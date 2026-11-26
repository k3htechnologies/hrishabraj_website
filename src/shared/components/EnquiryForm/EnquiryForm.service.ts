import { createQueryParams } from '@/shared/utils/createQueryParams';

import { apiClient } from '@/app/http/api-client';
import type { LocationBasedProjectsRequest, LocationsRequest, SubmitEnquiryRequest } from './EnquiryForm.request';
import type { LocationsResponse, ProjectResponse } from './EnquiryForm.response';
import { EnquiryApi } from './EnquiryForm.api';


export const EnquiryService = {
  apiCallFetchLocations: async (request: LocationsRequest) => {
    const recordRequest = Object.fromEntries(
      Object.entries(request).map(([key, value]) => [key, value])
    );
    const queryParams = createQueryParams(recordRequest);
    return apiClient.get<LocationsResponse>(
      `${EnquiryApi.PULL_LOCATION}?${queryParams}`
    );
  },
  apiCallFetchProjectsBasedOnLocation: async (
    request: LocationBasedProjectsRequest
  ) => {
    const recordRequest = Object.fromEntries(
      Object.entries(request).map(([key, value]) => [key, value])
    );
    const queryParams = createQueryParams(recordRequest);
    return apiClient.get<ProjectResponse>(
      `${EnquiryApi.PULL_LOCATION_BASED_PROJECTS}?${queryParams}`
    );
  },
  apiCallSubmitEnquiry: async (request: SubmitEnquiryRequest) => {
    return apiClient.post(`${EnquiryApi.ADD_ENQUIRY}`, request);
  },
};
