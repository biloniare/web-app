export type Store = {
  locationId: string;
  storeNumber: string;
  divisionNumber: string;
  chain: string;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    zipCode: string;
    county: string;
  };
  geolocation: {
    latitude: number;
    longitude: number;
    latLng: string;
  };
  name: string;
  hours: {
    timezone: string;
    gmtOffset: string;
    open24: boolean;
    monday: OperatingHours;
    tuesday: OperatingHours;
    wednesday: OperatingHours;
    thursday: OperatingHours;
    friday: OperatingHours;
    saturday: OperatingHours;
    sunday: OperatingHours;
  };
  phone: string;
  departments: Department[];
};

export type OperatingHours = {
  open: string;
  close: string;
  open24: boolean;
};

export type Department = {
  departmentId: string;
  name: string;
  phone?: string;
  hours?: {
    open24: boolean;
    monday?: OperatingHours;
    tuesday?: OperatingHours;
    wednesday?: OperatingHours;
    thursday?: OperatingHours;
    friday?: OperatingHours;
    saturday?: OperatingHours;
    sunday?: OperatingHours;
  };
};

export type StoreData = {
  data: Store[];
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
};
