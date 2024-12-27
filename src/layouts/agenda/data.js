export const EVENTS = [
    {
        event_id: 1,
        title: "Event 1",
        start: new Date(new Date(new Date().setHours(9)).setMinutes(30)),
        end: new Date(new Date(new Date().setHours(10)).setMinutes(30)),
        doctor_id: 1
    },
    {
        event_id: 2,
        title: "Event 2",
        start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
        end: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
        doctor_id: 2
    },
    {
        event_id: 3,
        title: "Event 3",
        start: new Date(
            new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
                new Date().getDate() - 1
            )
        ),
        end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
        doctor_id: 1
    },
    {
        event_id: 4,
        title: "Event 4",
        start: new Date(
            new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
                new Date().getDate() - 2
            )
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
                new Date().getDate() - 2
            )
        ),
        doctor_id: 2
    },
    {
        event_id: 5,
        title: "Event 5",
        start: new Date(
            new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
                new Date().getDate() - 2
            )
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
                new Date().getDate() + 10
            )
        ),
        doctor_id: 4
    },
    {
        event_id: 6,
        title: "Event 6",
        start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
        end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
        doctor_id: 2
    },
    {
        event_id: 7,
        title: "Event 7",
        start: new Date(
            new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
                new Date().getDate() - 1
            )
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(12)).setMinutes(0)).setDate(
                new Date().getDate() - 1
            )
        ),
        doctor_id: 3
    },
    {
        event_id: 8,
        title: "Event 8",
        start: new Date(
            new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
                new Date().getDate() - 1
            )
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
                new Date().getDate() - 1
            )
        ),
        doctor_id: 4
    },
    {
        event_id: 9,
        title: "Event 11",
        start: new Date(
            new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
                new Date().getDate() + 1
            )
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(15)).setMinutes(30)).setDate(
                new Date().getDate() + 1
            )
        ),
        doctor_id: 1
    },
    {
        event_id: 10,
        title: "Event 9",
        start: new Date(
            new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
                new Date().getDate() + 1
            )
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(16)).setMinutes(30)).setDate(
                new Date().getDate() + 1
            )
        ),
        doctor_id: 2
    },
    {
        event_id: 11,
        title: "Event 10",
        start: new Date(
            new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
                new Date().getDate() - 1
            )
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
                new Date().getDate() - 1
            )
        ),
        doctor_id: 1
    }
];

export const DOCTOR = [
    {
        doctor_id: 1,
        title: "John",
        adress: "Online",
        avatar: "https://picsum.photos/200/300",
        color: "#ab2d2d"
    },
    {
        doctor_id: 2,
        title: "Sarah",
        adress: "Presencial",
        avatar: "https://picsum.photos/200/300",
        color: "#58ab2d"
    },
    {
        doctor_id: 3,
        title: "Joseph",
        adress: "Online",
        avatar: "https://picsum.photos/200/300",
        color: "#a001a2"
    },
    {
        doctor_id: 4,
        title: "Mera",
        adress: "Presencial",
        avatar: "https://picsum.photos/200/300",
        color: "#08c5bd"
    }
];

export const PATIENTS = [
    {
        id: 1,
        firstName: "Carlos",
        lastName: "Hernández",
        phone: "555123456",
        email: "carlos.hernandez@example.com",
        insured: true, // De aseguradora
        private: false // Privado
    },
    {
        id: 2,
        firstName: "María",
        lastName: "López",
        phone: "555654321",
        email: "maria.lopez@example.com",
        insured: false, // De aseguradora
        private: true // Privado
    },
    {
        id: 3,
        firstName: "Luis",
        lastName: "Martínez",
        phone: "555987654",
        email: "luis.martinez@example.com",
        insured: true, // De aseguradora
        private: false // Privado
    }
];