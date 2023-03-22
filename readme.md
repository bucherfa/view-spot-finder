# view-spot-finder

## usage

### cli

```bash
# general usage
node src/cli.js <mesh file> <number of view spots>
# with example file from input folder
node src/cli.js input/mesh_x_sin_cos_10000.json 8
```

### serverless

```bash
# general usage
serverless invoke local --function main --data '{"fileName":<mesh file>,"viewSpotAmount":<number of view spots>}'
# with example file from input folder
serverless invoke local --function main --data '{"fileName":"input/mesh.json","viewSpotAmount":3}'
```
