import React from 'react'
import gql from 'graphql-tag'
import { navigate } from '@reach/router'
import { withApollo, WithApolloClient } from 'react-apollo'
import { Button, Card, Form, Input, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

interface EnqueueSubmitProps extends FormComponentProps {
  jobId?: string
  taskId?: string
  startIn?: string
  startAt?: string
  cron?: string
}

type EnqueueSubmitPropsWithApollo = WithApolloClient<EnqueueSubmitProps>

const enqueueMutation = gql`
  mutation enqueue($input: NewJobInput!) {
    enqueue(newJobData: $input) {
      taskId
      jobId
    }
  }
`

class EnqueueForm extends React.Component<EnqueueSubmitPropsWithApollo> {
  handleSubmit = async (event: React.FormEvent<any>) => {
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { client } = this.props
        const { taskId } = values

        message.loading('Enqueueing job...', 10)

        try {
          await client.mutate({
            mutation: enqueueMutation,
            variables: {
              input: {
                taskId: taskId,
                image: 'ubuntu',
                command: 'ls -lah',
              },
            },
          })
          message.destroy()

          await message.success('Job enqueued with sucess', 1.5)
          navigate(`/tasks/${taskId}`)
        } catch (err) {
          message.success(
            'Failed to enqueue job. Please, try again later.',
            1.5,
          )
          console.error(err)
          return
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {}

    return (
      <Form onSubmit={this.handleSubmit} layout="vertical">
        <Card>
          <p
            style={{
              fontSize: 18,
              color: 'rgba(0, 0, 0, 0.85)',
              marginBottom: 30,
              fontWeight: 500,
            }}
          >
            Job details
          </p>

          <Form.Item
            {...formItemLayout}
            label="Task ID"
            extra="Task id to enqueue a new job under."
            required={true}
          >
            {getFieldDecorator('taskId', {
              rules: [
                {
                  required: true,
                  message: 'Please enter a Task unique ID.',
                },
              ],
            })(<Input size="large" />)}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Job ID"
            help="Job id to enqueue a new job under. This value is optional."
          >
            <Input size="large" />
          </Form.Item>

          <p
            style={{
              fontSize: 18,
              color: 'rgba(0, 0, 0, 0.85)',
              marginBottom: 30,
              marginTop: 30,
              fontWeight: 500,
            }}
          >
            Scheduling
          </p>

          <Form.Item
            {...formItemLayout}
            label="Job delay"
            help="Amount of time to delay starting this job."
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Job start date"
            help="Datetime when this job will start running."
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Periodic scheduling (CRON)"
            help="CronTab style scheduling of jobs. Ex.: 0 * * * * (every
            hour)"
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ marginTop: 20 }}
            >
              Enqueue
            </Button>
          </Form.Item>
        </Card>
      </Form>
    )
  }
}

const EnqueueFormMutation = withApollo(EnqueueForm)
const MyForm = Form.create()(EnqueueFormMutation)

export default MyForm
