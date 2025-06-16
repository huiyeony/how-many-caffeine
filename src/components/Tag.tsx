interface TagProps {
  item: string;
}
import "./Tag.css";
export const Tag = ({ item }: TagProps) => {
  return (
    <div className="box-tags-wrapper">
      <span>{item}</span>
    </div>
  );
};
