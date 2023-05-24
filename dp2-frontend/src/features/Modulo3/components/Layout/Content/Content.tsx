import './Content.css';
import Sidebar from '@components/Sidebar';
import sidebarItems from '../../../utils/sidebarItems'
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
    <Sidebar items={sidebarItems} active='/skillManagement/evaluationTemplate/edit'>
    <div className='content'>
      {header}
      {body}
    </div>
    </Sidebar>

  );
};

export default Layout;