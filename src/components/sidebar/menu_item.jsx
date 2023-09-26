import Image from "next/image";
import Link from "next/link";

function MenuField({ icon, name, link }) {
  return (
    <div className="flex items-center pl-6 pt-3">
      <Image src={icon} alt="MENU" width={28} height={28} />
      <div className="ml-5">
        <Link href={link}>
          <span className="block">{name}</span>
        </Link>
      </div>
    </div>
  );
}

export default MenuField;
