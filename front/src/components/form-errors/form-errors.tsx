interface FormErrorsProps {
  messages: string[];
}

export const FormErrors = ({ messages }: FormErrorsProps) => {
  return (
    <>
      {messages.map((message: string) => (
        <span className="p-error" key={message}>
          {message}
        </span>
      ))}
    </>
  );
};
