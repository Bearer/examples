export default {
  components: [
    {
      classname: 'SetupDisplay',
      isRoot: true,
      initialTagName: 'setup-display',
      group: 'setup',
      label: 'Setup Display Component'
    },
    {
      classname: 'SetupAction',
      isRoot: true,
      initialTagName: 'setup-action',
      group: 'setup',
      label: 'Setup Action Component',
      output: {
        setupId: {
          schema: {
            type: "string",
            format: "uuid"
          }
        }
      }
    },
    {
      classname: 'ConnectAction',
      isRoot: true,
      initialTagName: 'connect-action',
      group: 'connect',
      label: 'Connect Action Component',
      input: {
        setupId: {
          schema: {
            type: "string",
            format: "uuid"
          }
        }

      },
      output: {
        channelId: {
          schema: {
            type: "string",
            format: "uuid"
          }
        }
      }
    },
    {
      classname: 'ChannelAction',
      isRoot: true,
      initialTagName: 'channel-action',
      group: 'channel',
      label: 'Channel Action Component',
      input: {
        setupId: {
          schema: {
            type: "string",
            format: "uuid"
          }
        }

      },
      output: {
        channelId: {
          schema: {
            type: "string",
            format: "uuid"
          }
        }
      }
    },
    {
      classname: 'FeatureAction',
      isRoot: true,
      initialTagName: 'feature-action',
      group: 'feature',
      label: 'Feature Action Component',
      input: {
        setupId: {
          schema: {
            type: "string",
            format: "uuid"
          }
        },
        authId: {
          schema: {
            type: "string",
            format: "uuid"
          }
        },
        channelId: {
          schema: {
            type: "string",
            format: "uuid"
          }
        },
        message: {
          schema: {
            type: "string"
          }
        }
      }
    }
  ]
}
