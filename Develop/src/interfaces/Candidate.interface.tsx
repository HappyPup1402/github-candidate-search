// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
    login: string;
    name: string;
    avatar_url: string;
    location: string | null;
    email: string | null;
    html_url: string;
    company: string | null;
    bio: string | null;
  }
  
  