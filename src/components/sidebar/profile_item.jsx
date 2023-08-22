import Image from "next/image";

function ProfileField({ name, email }) {
  return (
    <div className="flex items-center p-4">
      <Image src="/images/logo.svg" alt="PROFILE" width={50} height={50} />
      <div className="ml-3">
        <span className="block text-xl font-bold">{name}</span>
        <span className="block text-xs text-ptd-dark-grey">{email}</span>
      </div>
    </div>
  );
}

export default ProfileField;
