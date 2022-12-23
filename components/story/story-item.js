import Image from "next/image";

const StoryItem = props => {
  const { name, image } = props;

  return (
    <li className="flex flex-col items-center text-center cursor-pointer">
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full mx-2">
        <figure className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[3px]">
          <Image
            layout="responsive"
            width={100}
            height={100}
            src={image}
            alt={name}
            className="rounded-full"
          />
        </figure>
      </div>
      <h3 className="w-16 overflow-hidden whitespace-nowrap text-ellipsis">
        <span>{name}</span>
      </h3>
    </li>
  );
};

export default StoryItem;
