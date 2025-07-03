export interface Person {
  _id: string;
  firstName: string;
  lastName: string;
  title?: string;
  companyName?: string;
  communityId: string;
  checkInTime?: Date | null;
  checkOutTime?: Date | null;
}

export interface PersonViewModel {
  _id: string;
  fullName: string;
  title?: string;
  companyName?: string;
  communityId: string;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  checkInTime?: Date | null;
  checkOutTime?: Date | null;
}
