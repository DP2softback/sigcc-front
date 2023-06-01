import './Section.css'

type SectionProps = {
  title: string,
  content: any,
  filters?: any,
  sectionStyle?: any,
  titleStyle?: any,
  contentStyle?: any,
  filtersStyle?: any,
}

const Section = ({ title, content, filters, sectionStyle, titleStyle, contentStyle, filtersStyle }: SectionProps) => {
  const titleComponent = (
    <div className='titleAndFilters' style={titleStyle}>
      {title && <div className="title">{title}</div>}
      {filters && <div className='filters' style={filtersStyle}>{filters}</div>}
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