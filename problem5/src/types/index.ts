export interface ResourceCreateDto {
  name: string;
  description: string;
  type?: string;
  isActive?: boolean;
}

export interface ResourceUpdateDto {
  name?: string;
  description?: string;
  type?: string;
  isActive?: boolean;
}

export interface ResourceFilters {
  name?: string;
  type?: string;
  isActive?: boolean;
}