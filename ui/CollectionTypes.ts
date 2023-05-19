// This interface defines what possible attributes a People object
// might have. It must have the first and last name, and might have
// a title and companyName.
export interface PeopleInterface {
    _id: string;
    firstName: string;
    lastName: string;
    title?: string;
    companyName?: string;
    checkInDate?: string;
    checkOutDate?: string;
}

// Describing what are the possible values for a document within
// the communities collection
export interface Event {
    _id: string;
    name: string;
}
