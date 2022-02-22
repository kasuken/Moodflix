import SkeletonElement from "../SkeletonElement/SkeletonElement";
import SkeletonWrapper from "../SkeletonWrapper/SkeletonWrapper";
import {motion} from "framer-motion";

const SkeletonModal = () => (
  <motion.div className="modal__skeleton--wrp">
    <SkeletonElement type="banner" />
    <motion.div className="modal__skeleton--contentWrp">
      <SkeletonElement type="title" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <br/>
      <br/>
      <SkeletonElement type="title" />
      <SkeletonElement type="keyword" />
      <SkeletonElement type="keyword" />
      <SkeletonElement type="keyword" />
      <SkeletonElement type="keyword" />
      <SkeletonElement type="keyword" />
      <SkeletonElement type="keyword" />
      <SkeletonElement type="keyword" />
      <br/>
      <br/>
      <SkeletonElement type="title" />
      <SkeletonWrapper type="review">
        <SkeletonElement type="review--img" />
        <SkeletonWrapper type="review--content">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </SkeletonWrapper>
      </SkeletonWrapper>
      <SkeletonWrapper type="review">
        <SkeletonElement type="review--img" />
        <SkeletonWrapper type="review--content">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </SkeletonWrapper>
      </SkeletonWrapper>
    </motion.div>
  </motion.div>
)

export default SkeletonModal;