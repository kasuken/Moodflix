import {FALLBACK_POSTER_IMG_URL, FALLBACK_BACKDROP_IMG_URL} from "../../requests";

const Fallback = ({name, type}) => {
  return (
    <>
      <img src={type === "backdrop" ? FALLBACK_POSTER_IMG_URL : FALLBACK_BACKDROP_IMG_URL} alt={name} />
      <div className='movie__fallback'>
        <span>{name}</span>
      </div>
    </>
  );
};

export default Fallback;