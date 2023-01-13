import "./styles.scss";

interface ErrorProps {
  data: string;
}

export default function Error({ data }: ErrorProps) {
  return (
    <div className="form-error">
      <p>{data}</p>
    </div>
  );
}
