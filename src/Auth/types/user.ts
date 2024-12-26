export interface UserCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface GoogleUserProfile {
  given_name?: string;
  family_name?: string;
  email?: string;
}

export interface GoogleUserInfo {
  profile: GoogleUserProfile;
}
