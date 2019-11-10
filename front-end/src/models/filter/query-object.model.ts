export interface QueryObjectModel {
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly titleSearchString: string;
  readonly authorSearchString: string;
  readonly itemType: string[];
  readonly pageNumber: number;
  readonly itemsPerPage: number;
}
