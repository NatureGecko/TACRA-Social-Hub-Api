export type TProfileUpdateSocialRequest = {
  urlMainStream?: {
    youtube?: string;
    x?: string;
    facebook?: string;
    blueSky?: string;
    instragrame?: string;
  };
  urlOther?: Record<string, string>;
  bio?: string;
};
