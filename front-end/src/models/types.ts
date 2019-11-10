export interface ActionTemplate {
  readonly type: string;
  readonly payload?: any;
}

export interface FilterForm {
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly titleSearchString: string;
  readonly authorSearchString: string;
  readonly itemType: string[];
}
