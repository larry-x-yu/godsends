rules: [
    {
        test: /\.scss$/,
        include: '/src',
        use: [
            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[local]___[hash:base64:5]'
                }
            }
        ],
    },
    {
        test: /\.css$/,
        include: '/src/styles',
        use: [
            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }
        ],
    }]