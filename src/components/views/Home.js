import React from "react";
import { Grid, Label, Segment, Placeholder } from "semantic-ui-react";
import api from "../../api";
import Podcast from "../podcasts/PodcastItem";
import { isOutdated } from "../utils/Utils";
import "../../css/podcasts.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: [],
      filteredPodcasts: [],
      filter: "",
      error: false
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount = () => {
    this.props.isLoading(true);

    const podcastsKey = "podcasts";

    if (
      localStorage.getItem(podcastsKey) === null ||
      isOutdated(JSON.parse(localStorage.getItem(podcastsKey)).timestamp)
    ) {
      api.podcasts.getAll().then(podcasts => {
        if (!podcasts) {
          console.error("Podcasts not found.");
          this.setState({ error: true });
          this.props.isLoading(false);
          return;
        }
        this.setState({ podcasts: podcasts, filteredPodcasts: podcasts });
        let lsObject = { value: podcasts, timestamp: new Date().getTime() };
        try {
          localStorage.setItem(podcastsKey, JSON.stringify(lsObject));
        } catch (e) {
          console.log("Local Storage is full, please empty data: " + e);
        }

        this.props.isLoading(false);
      });
    } else {
      let lsPodcasts = JSON.parse(localStorage.getItem(podcastsKey)).value;
      this.setState({ podcasts: lsPodcasts, filteredPodcasts: lsPodcasts });
      this.props.isLoading(false);
    }
  };

  onChange = e => {
    let updatedList = this.state.podcasts.filter(
      podcast =>
        podcast.author.toLowerCase().search(e.target.value.toLowerCase()) !==
          -1 ||
        podcast.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    );
    this.setState({ filter: e.target.value, filteredPodcasts: updatedList });
  };

  render() {
    if (this.state.error) {
      return <h2>Something went wrong, check the console</h2>;
    }
    return (
      <div>
        {!this.props.loading && (
          <Segment textAlign="right" className="podcast-no-border">
            <Label color="blue" size="large">
              {this.state.filteredPodcasts.length}
            </Label>
            <div className="ui icon focus input">
              <i className="search icon" />
              <input
                type="text"
                placeholder="Filter podcasts..."
                name="filter"
                onChange={this.onChange}
                value={this.state.filter}
              />
            </div>
          </Segment>
        )}

        <Grid columns={4} padded centered>
          {this.state.filteredPodcasts.map(podcast => {
            return (
              <Grid.Column width={4} key={podcast.id}>
                {this.props.loading ? (
                  <Segment raised>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length="medium" />
                        <Placeholder.Line length="short" />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  </Segment>
                ) : (
                  <Podcast podcast={podcast} />
                )}
              </Grid.Column>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default Home;
