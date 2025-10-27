import Link from "next/link";
import Image from "next/image";

import {
  MoreHorizontal,
  Image as ImageIcon,
  Edit,
  Trash,
} from "@deemlol/next-icons";
import { Divider } from "../Divider";
import { Dropdown } from "../Dropdown";

export default function Card({ data }: { data: any }) {
  const slug = encodeURIComponent(
    String(data?.name).trim().replace(/\s/g, "-").toLocaleLowerCase()
  );

  interface menuItem {
    name: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    action: any;
  }

  const cardMenuItems: menuItem[] = [
    { name: "Rename", icon: Edit, action: "" },
    { name: "Edit", icon: Edit, action: "" },
    { name: "Delete", icon: Trash, action: "" },
  ];

  return (
    <div className="relative group bg-white rounded-md p-3 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors ease-in duration-75">
      <div className="z-10 absolute top-4 right-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-75 ease-in">
        <Dropdown
          inner={
            <div className="flex items-center justify-center rounded-md bg-white border border-gray-200 h-6 w-6 cursor-pointer">
              <MoreHorizontal size={10} color="var(--color-gray-600)" />
            </div>
          }
        >
          <div className="flex flex-col p-1">
            {cardMenuItems.map(({ name, icon: Icon, action }, index) => {
              const seperateAt = 1;
              return (
                <div key={index}>
                  {index > seperateAt && (
                    <div className="-mx-1">
                      <Divider />
                    </div>
                  )}
                  <button className="w-full inline-flex items-center text-left gap-2 rounded-md px-2 py-1 text-sm cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                    {Icon && <Icon size={12} />}
                    {name}
                  </button>
                </div>
              );
            })}
          </div>
        </Dropdown>
      </div>

      <Link
        href={`/scoresheet/${slug}?id=${data.id}`}
        className="flex flex-col gap-2 "
      >
        <div className="relative w-full aspect-video overflow-hidden rounded-md bg-gray-50 flex items-center justify-center">
          {data.image_path ? (
            <Image
              src={data.image_path}
              alt={`${data.name} Cover`}
              draggable="false"
              fill
              className="object-center object-cover"
            />
          ) : (
            <ImageIcon size={40} className="text-gray-300" />
          )}
        </div>
        <div>
          <span className="font-semibold">{data.name}</span>
        </div>
      </Link>
    </div>
  );
}
