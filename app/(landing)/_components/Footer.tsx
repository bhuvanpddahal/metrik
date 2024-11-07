import Logo from "@/components/Logo";

const Footer = () => {
    return (
        <footer>
            <div className="container pb-20">
                <div className="flex justify-between pb-7">
                    <div>
                        <Logo />
                        <div>
                            600 California St, 11th floor, CA 98107
                        </div>
                    </div>
                    <div>
                        <div className="text-foreground">
                            <h3 className="font-bold">Product</h3>
                            <ul>
                                <li>Integrations</li>
                                <li>Integrations</li>
                                <li>Integrations</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between border-t pt-7">
                    <div>
                        @ {(new Date()).getFullYear()} Metrik Inc.
                    </div>
                    <ul>
                        <li>Social</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;