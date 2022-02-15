import {FALLBACK_IMG_URL} from "../../utils";

const Fallback = (title) => {
  return (
    <>
      <img src={FALLBACK_IMG_URL} alt={title} />
      <div className='movie__fallback'>
        <span>{title}</span>
      </div>
    </>
  );
};

export default Fallback;