// Libraries
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

// Components
import {Grid, Columns} from 'src/clockface'
import {Page} from '@influxdata/clockface'
import Resources from 'src/me/components/Resources'
import Header from 'src/me/components/UserPageHeader'
import Docs from 'src/me/components/Docs'
import GettingStarted from 'src/me/components/GettingStarted'

// Types
import {AppState} from 'src/types'

// Constants
import {PAGE_TITLE_SUFFIX} from 'src/shared/constants'

// Decorators
import {ErrorHandling} from 'src/shared/decorators/errors'

import {Panel} from 'src/clockface'

interface StateProps {
  me: AppState['me']
}

@ErrorHandling
export class MePage extends PureComponent<StateProps> {
  public render() {
    const {me} = this.props

    return (
      <Page
        className="user-page"
        loadingTitleTag={`My Account${PAGE_TITLE_SUFFIX}`}
      >
        <Header userName={me.name} />
        <Page.Contents fullWidth={false} scrollable={true}>
          <div className="col-xs-12">
            <Grid>
              <Grid.Row>
                <Grid.Column widthSM={Columns.Eight} widthMD={Columns.Nine}>
                  <Panel>
                    <Panel.Header title="Getting started with InfluxDB 2.0" />
                    <Panel.Body>
                      <GettingStarted />
                    </Panel.Body>
                  </Panel>
                  <Docs />
                </Grid.Column>
                <Grid.Column widthSM={Columns.Four} widthMD={Columns.Three}>
                  <Resources me={me} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Page.Contents>
      </Page>
    )
  }
}

const mstp = (state: AppState): StateProps => {
  const {me} = state

  return {me}
}

export default connect<StateProps>(
  mstp,
  null
)(MePage)