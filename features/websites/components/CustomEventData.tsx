import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/Table";
import MonoTextBlock from "./MonoTextBlock";

interface CustomEventDataProps {
    data: Record<PropertyKey, unknown>;
}

const CustomEventData = ({ data }: CustomEventDataProps) => {
    const keys = Object.keys(data);

    return (
        <div className="mt-1 px-5">
            <Table>
                <TableHeader>
                    <TableRow className="h-7 text-xs uppercase hover:bg-transparent">
                        <TableHead className="h-full">Parameter</TableHead>
                        <TableHead className="h-full">Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {keys.map((key) => {
                        const stringifiedValue = JSON.stringify(data[key]);
                        const displayValue = stringifiedValue.slice(1, stringifiedValue.length - 1);

                        return (
                            <TableRow key={key} className="border-b-0 hover:bg-transparent">
                                <TableCell className="px-0 py-1">
                                    <MonoTextBlock text={key}>
                                        {key}
                                    </MonoTextBlock>
                                </TableCell>
                                <TableCell className="px-0 py-1">
                                    <MonoTextBlock text={displayValue}>
                                        {displayValue}
                                    </MonoTextBlock>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomEventData;