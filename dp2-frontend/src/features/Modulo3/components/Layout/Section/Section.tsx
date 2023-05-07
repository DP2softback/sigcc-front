import './Section.css'

type SectionProps = {
  title: string,
  content: any,
  filters?: any
}

const Section = ({ title, content, filters }: SectionProps) => {
  const titleComponent = (
    <div className='titleAndFilters'>
      <div className="title">{title}</div>
      {filters ? <div className='filters'>{filters}</div> : <></>}
    </div>
  );

  const contentComponet = (
    <div className='row'>
      {content}
    </div>
  );

  return (
    <>
      {titleComponent}
      {contentComponet}
    </>
  );
};

export default Section;