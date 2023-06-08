import './Content.css';

type LayoutProps = {
  title: string,
  body: any,
  route?: string,
  subtitle?: string
}

const Content = ({title, body, subtitle, route=''} : LayoutProps) => {
  const header = (
    <div className='header'>
      <div className='screenTitle'>{title}</div>
      {subtitle ? <div className='subtitle'>{subtitle}</div> : <></>}
    </div>
  )

  return (
    <>
      {header}
      {body}
    </>
  );
};

export default Content;