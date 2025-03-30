export interface AuthorityLink {
  rel: string;
  href: string;
}

export interface Authority {
  LocalAuthorityId: number;
  LocalAuthorityIdCode: string;
  Name: string;
  FriendlyName: string;
  Url: string;
  SchemeUrl: string;
  Email: string;
  RegionName: string;
  FileName: string;
  FileNameWelsh: string | null;
  EstablishmentCount: number;
  CreationDate: string;
  LastPublishedDate: string;
  SchemeType: number;
  links: AuthorityLink[];
}

export interface AuthoritiesResponse {
  authorities: Authority[];
}

export interface Geocode {
    longitude: string;
    latitude: string;
}

export interface Scores {
    Hygiene: number;
    Structural: number;
    ConfidenceInManagement: number;
}

export interface Establishment {
    AddressLine1: string;
    AddressLine2: string;
    AddressLine3: string;
    AddressLine4: string;
    BusinessName: string;
    BusinessType: string;
    BusinessTypeID: number;
    ChangesByServerID: number;
    Distance: number | null;
    FHRSID: number;
    LocalAuthorityBusinessID: string;
    LocalAuthorityCode: string;
    LocalAuthorityEmailAddress: string;
    LocalAuthorityName: string;
    LocalAuthorityWebSite: string;
    NewRatingPending: boolean;
    Phone: string;
    PostCode: string;
    RatingDate: string;
    RatingKey: string;
    RatingValue: string;
    RightToReply: string;
    SchemeType: string;
    geocode: Geocode;
    scores: Scores;
}

export interface EstablishmentsResponse {
  establishments: Establishment[];
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
}

export interface SortOption {
  sortOptionId: number;
  sortOptionName: string;
  sortOptionKey: string;
}

export interface SortOptionsResponse {
  sortOptions: SortOption[];
}