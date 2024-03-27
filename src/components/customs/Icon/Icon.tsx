import IonIcon from '@reacticons/ionicons';

type IconProps = {
  className?: string;
  name: string;
  onClick?: any;
};

const Icon = ({ className, name, onClick }: IconProps) => {
  return <IonIcon onClick={onClick} name={name as any} className={`  ${className}`} />;
};

export default Icon;
