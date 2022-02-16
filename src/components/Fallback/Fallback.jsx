import {FALLBACK_IMG_URL} from "../../requests";

const Fallback = ({name}) => {
  return (
    <>
      <img src={FALLBACK_IMG_URL} alt={name} />
      <div className='movie__fallback'>
        <span>{name}</span>
      </div>
    </>
  );
};

export default Fallback;