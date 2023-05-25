import './Content.css';

type LayoutProps = {
  title: string,
  body: any,
  subtitle?: string
}

const Layout = ({title, body, subtitle} : LayoutProps) => {
  const header = (
    <div className='header'>
      <div className='screenTitle'>{title}</div>
      {subtitle ? <div className='subtitle'>{subtitle}</div> : <></>}
    </div>
  )

  return (
    <div className='content'>
      {header}
      {body}
    </div>
  );
};

export default Layout;