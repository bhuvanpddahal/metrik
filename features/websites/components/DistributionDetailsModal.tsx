"use client";

import { XIcon } from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useDistributionDetailsModal } from "../hooks/useDistributionDetailsModal";

const DistributionDetailsModal = () => {
    const {
        isOpen,
        title,
        chartData,
        dataKey,
        labelFormatter,
        labelClassName,
        close
    } = useDistributionDetailsModal();

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent defaultCloseBtn={false} className="gap-0 p-0 overflow-hidden">
                <DialogHeader className="flex-row items-center justify-between pl-4 pr-2 py-2 border-b space-y-0">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="sr-only">
                        Distribution details for {title}
                    </DialogDescription>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon">
                            <XIcon className="size-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <ScrollArea className="max-h-[29.5rem]">
                    {chartData.length ? (
                        <ul className="py-4">
                            {chartData.map((row, index) => (
                                <li key={index} className="min-h-11 flex items-center justify-between gap-x-3 px-6 py-3 even:bg-muted">
                                    <div className={cn("text-sm", labelClassName)}>
                                        {labelFormatter?.(row[dataKey] as string | null) ?? row[dataKey]}
                                    </div>
                                    <div className="text-sm font-medium">
                                        {row.totalVisitors}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-muted-foreground text-sm font-medium text-center py-16">
                            No data to show
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default DistributionDetailsModal;