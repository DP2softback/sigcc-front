import './Section.css'

type SectionProps = {
  title: string,
  content: any,
  filters?: any,
  sectionStyle?: any,
  titleStyle?: any,
  contentStyle?: any,
}

const Section = ({ title, content, filters, sectionStyle, titleStyle, contentStyle }: SectionProps) => {
  const titleComponent = (
    <div className='titleAndFilters' style={titleStyle}>
      {title && <div className="title">{title}</div>}
      {filters && <div className='filters'>{filters}</div>}
    </div>
  );

  const contentComponet = (
    <div className='row' style={contentStyle}>
      {content}
    </div>
  );

  return (
    <div className='section' style={sectionStyle}>
      {titleComponent}
      {contentComponet}
    </div>
  );
};

export default Section;