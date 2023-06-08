import { z } from 'zod'
import { RestaurantOrderByWithRelationInputObjectSchema } from './objects/RestaurantOrderByWithRelationInput.schema'
import { RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema'
import { RestaurantWhereUniqueInputObjectSchema } from './objects/RestaurantWhereUniqueInput.schema'
import { RestaurantCountAggregateInputObjectSchema } from './objects/RestaurantCountAggregateInput.schema'
import { RestaurantMinAggregateInputObjectSchema } from './objects/RestaurantMinAggregateInput.schema'
import { RestaurantMaxAggregateInputObjectSchema } from './objects/RestaurantMaxAggregateInput.schema'
import { RestaurantAvgAggregateInputObjectSchema } from './objects/RestaurantAvgAggregateInput.schema'
import { RestaurantSumAggregateInputObjectSchema } from './objects/RestaurantSumAggregateInput.schema'

export const RestaurantAggregateSchema = z.object({
  orderBy: z
    .union([
      RestaurantOrderByWithRelationInputObjectSchema,
      RestaurantOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: RestaurantWhereInputObjectSchema.optional(),
  cursor: RestaurantWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), RestaurantCountAggregateInputObjectSchema])
    .optional(),
  _min: RestaurantMinAggregateInputObjectSchema.optional(),
  _max: RestaurantMaxAggregateInputObjectSchema.optional(),
  _avg: RestaurantAvgAggregateInputObjectSchema.optional(),
  _sum: RestaurantSumAggregateInputObjectSchema.optional(),
})
