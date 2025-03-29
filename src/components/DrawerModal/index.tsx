import { useState, useCallback, ReactNode, FC, MouseEvent } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import useKeypress from "@/hooks/useKeypress";

type DrawerModalProps = {
  title?: string;
  widthPercentage?: string|number;
  bgColor?: string;
  textColor?: string;
  rtl?: boolean;
  element: ReactNode;
  children: ReactNode;
};

const DrawerModal: FC<DrawerModalProps> = ({
  widthPercentage = 80,
  bgColor = "#080808",
  textColor = "#fff",
  title,
  element,
  children,
}) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  console.log("click ==> ", click);
  console.log(widthPercentage)
  const escFunction = useCallback((event: globalThis.KeyboardEvent) => {
    if (event.key === "Escape") {
      console.log("esc pressed");
      setClick(false);
    }
  }, []);

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log("click!");
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setClick(false);
  };
  //Faz o modal se fechar quando pressionada a tecla Esc
  useKeypress(escFunction);
  //Faz o modal se fechar quando clicado fora do componente
  const ref = useOutsideClick(handleClickOutside);

  return (
    <div
      onClick={handleModalClick}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className="block" onClick={handleClick}>
        {element}
      </div>
      <ul
      style={{backgroundColor: bgColor, color: textColor, width: `${widthPercentage}vw`}}
        className={
          click
            ? `fixed flex-col 
            justify-center 
            items-center 
            top-0 left-0 
            w-[${widthPercentage}vw] h-screen
            text-center 
            duration-300
            bg-[${bgColor}]
            z-1 translate-x-0`
            : `fixed flex-col 
            justify-center 
            items-center top-0 
            left-[-100%] w-full h-screen
            text-center 
            duration-300
            bg-[${bgColor}]
            -z-1 `
        }
      >
        {" "}
        <div className={`text-[${textColor}]`}>
          <div className="flex justify-between mx-5 p-5">
            <h2 className="text-3xl">{title}</h2>
            <button className="text-2xl text-blue-400" onClick={handleClick}>
              Close
            </button>
          </div>
          <hr className="mx-5" />

          {children}
        </div>
      </ul>
    </div>
  );
};

export default DrawerModal;
