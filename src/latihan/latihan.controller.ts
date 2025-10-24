import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LatihanService } from './latihan.service';
import { CreateLatihanDto, LatihanDto } from './latihan.dto';

@Controller('latihan')
export class LatihanController {
    constructor(private latihanService:LatihanService){}
    
    @Post('create')
    createLatihan(@Body() payload:CreateLatihanDto) {

        
        return this.latihanService.createLatihan(payload);
    }

    @Get('list')
    getLatihan(@Query() query:any) {
        return this.latihanService.getLatihan(query);
    }

    @Get('detail/:id')
    getDetail(@Param('id') id:number) {
        return this.latihanService.getDetail(id);
    }

    @Put("update/:id")
    updateLatihan(@Param('id') id:number, @Body() payload:any) {
        return this.latihanService.updateLatihan(id, payload);
    }

    @Delete("delete/:id")
    deleteLatihan(@Param('id') id:number) {
        return this.latihanService.deleteLatihan(id);
    }

    @Post("create-bulk")
    createBulkLatihan(@Body() payload:any) {
        return this.latihanService.createBulkLatihan(payload);
    }
}