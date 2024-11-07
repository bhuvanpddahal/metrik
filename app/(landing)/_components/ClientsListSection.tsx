import Image from "next/image";

const clients = [
    {
        name: "Next JS",
        logo: "/next.svg",
        url: "https://nextjs.org"
    },
    {
        name: "Next JS",
        logo: "/next.svg",
        url: "https://nextjs.org"
    },
    {
        name: "Next JS",
        logo: "/next.svg",
        url: "https://nextjs.org"
    },
    {
        name: "Next JS",
        logo: "/next.svg",
        url: "https://nextjs.org"
    },
    {
        name: "Next JS",
        logo: "/next.svg",
        url: "https://nextjs.org"
    }
];

const ClientsListSection = () => {
    return (
        <section className="flex flex-col items-center gap-y-10 pb-20">
            <h2 className="text-lg font-medium text-muted-foreground">
                Trusted by Industry Leaders
            </h2>
            <ul className="flex gap-x-10">
                {clients.map((client, index) => (
                    <Image
                        key={index}
                        src={client.logo}
                        alt={client.name}
                        width={100}
                        height={20}
                        className="h-[30px] w-auto"
                    />
                ))}
            </ul>
        </section>
    );
};

export default ClientsListSection;