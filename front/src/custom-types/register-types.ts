export interface RegisterProps {
    company: {
        representatives: string[];
        address: {
            street: string;
            city: string;
            postalCode: string;
        },
        NIP: string;
        REGON: string;
        KRS: string;
        name: string;
    }
    firstName: string;
    lastName: string;
    email: string;
    identityCardNumber: string;
    phoneNumber: string;
}

