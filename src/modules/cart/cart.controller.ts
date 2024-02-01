import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto/cart-item.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly _cartService: CartService) {}

    @Get()
    getAllItems() {
        return this._cartService.getAllItems();
    }

    @Get(':id')
    getItemById(@Param('id') id: number) {
        return this._cartService.getItemById(id);
    }

    @Post()
    createItem(@Body() createCartItemDto: CreateCartItemDto) {
        return this._cartService.createItem(createCartItemDto);
    }

    @Put(':id')
    updateItem(
        @Param('id') id: number,
        @Body() updateCartItemDto: UpdateCartItemDto,
    ) {
        return this._cartService.updateItem(id, updateCartItemDto);
    }

    @Delete(':id')
    deleteItem(@Param('id') id: number) {
        return this._cartService.deleteItem(id);
    }
}
