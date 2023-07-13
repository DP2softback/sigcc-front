import React, { createRef } from 'react'
import Card from 'react-bootstrap/Card'

export default class SummaryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    }
  }

  static defaultProps = {
    counter: 0,
    duration: 1000,
    autoscale: true,
  }

  sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  componentDidMount() {
    if (!this.props.title) return;
    if (isNaN(this.props.title)) return;
    let startValue = 0;
    let endValue = parseInt(this.props.title);
    let duration = Math.floor(this.props.duration / endValue);
    (duration > 200) && (duration = 200);
    let counter = setInterval(function () {
      startValue += 1;
      this.setState({ counter: startValue });
      if (startValue == endValue) {
        clearInterval(counter);
      }
    }.bind(this), duration);
  }

  render() {
    return (
      <>
        <Card
          bg={this.props.variant.toLowerCase()}
          key={this.props.variant}
          text={(this.props.variant.toLowerCase() === 'warning' || this.props.variant.toLowerCase() === 'info') ? 'dark' : 'white'}
          style={{ height: '100%' }}
        >
          <Card.Header>{this.props.header}</Card.Header>
          <div className='vertical-align-parent'>
            <div className='vertical-align-child'>
              <Card.Body style={{ textAlign: 'center' }}>
                <Card.Title className='animate__animated animate__pulse' style={this.props.autoscale ? { fontSize: '6vw' } : { fontSize: '2.5rem' }}>{this.state.counter}</Card.Title>
                  <Card.Text>
                    {this.props.body !== '--' ? this.props.body : 'No se encontraron entregables'}
                  </Card.Text>
              </Card.Body>
            </div>
          </div>
        </Card>
      </>
    );
  }
}