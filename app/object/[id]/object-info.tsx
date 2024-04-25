import { getObject } from "@/data/object";
import { Flex } from "antd";

export default async function ObjectInfo({ id, className }: { id: number, className?: string }) {
    let object = await getObject(id);

    return (
        <Flex vertical className={className}>
            <Flex gap="small" align="end">
                <h1 className="text-xl">{object.name}</h1>
                <h2 className="text-fg2-c">({object.prod_year})</h2>
            </Flex>
        </Flex>
    );
}
