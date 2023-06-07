import './Content.css';
import Layout from "@layout/default/index";

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
    <Layout>
      {header}
      {body}
    </Layout>
  );
};

export default Content;