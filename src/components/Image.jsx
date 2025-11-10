export default function Image({ src, ...props }) {
  return (
    <img src={import.meta.env.BASE_URL + src.replace(/^\//, '')} {...props} />
  );
}
