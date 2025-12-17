const colours = [
    "from-pink-500 to-purple-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-amber-500",
    "from-orange-500 to-red-500"
  ];

  interface prop {
    text:string
    classname?:any

  }
  
  export const GradientLetters = ( {text,classname}:prop) => (
    <h1 className={`text-4xl font-bold tracking-tight  sm:text-5xl md:text-7xl leading-tight flex flex-wrap ${classname}`}>
      {text.split("").map((char:any, index:number) => {
        const gradient = colours[index % colours.length];
        return (
          <span
            key={index}
            className={`bg-gradient-to-b ${gradient} bg-clip-text text-transparent`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
  