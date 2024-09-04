let handler = ev => ev

handler.static = (mc, { config }) => {
  mc.world.beforeEvents.playerBreakBlock.subscribe(({ player, block }) => {
    console.warn(`${player.name} have broken:\n  block: ${block.typeId}\n  at: ${Math.formatPos(block.location, 2).replace(/§.{1}/g, "")}\n  in: ${player.dimension.id}`)
  })
  
  mc.world.afterEvents.playerPlaceBlock.subscribe(({ player, block, dimension }) => {
    console.warn(`${player.name} have placed:\n  block: ${block.typeId}\n  at: ${Math.formatPos(block.location, 2).replace(/§.{1}/g, "")}\n  in: ${player.dimension.id}`)
  })
}

export default handler