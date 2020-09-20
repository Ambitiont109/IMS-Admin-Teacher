import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { BookStatus, ExchangeLibrary } from '../../../@core/models/exchangelibrary';
import { ExchangeLibraryService } from '../../../@core/services/exchange-library.service';
import { YesNoDialogComponent } from '../../../components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'ngx-exchange-library',
  templateUrl: './exchange-library.component.html',
  styleUrls: ['./exchange-library.component.scss']
})
export class ExchangeLibraryComponent implements OnInit {

  searchWord:string;
  books:ExchangeLibrary[];
  filteredbooks:ExchangeLibrary[];
  constructor(
    private exchangeLibraryService:ExchangeLibraryService,
    private router:Router,
    private route:ActivatedRoute,
    private dialogService:NbDialogService,
  ) { }

  ngOnInit(): void {
    this.exchangeLibraryService.getAllBooks().subscribe(data => {this.books = data; this.filteredbooks = this.books;})
  }
  onSearchWordChange(data){
    this.filteredbooks = this.books.filter((item:ExchangeLibrary)=>{return item.title.includes(this.searchWord)});
  }
  newExchangeLibraryClick(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  onDeleteClick(book:ExchangeLibrary){
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'Are you sure?'
    }}).onClose.subscribe(ret=>{
      if(ret==true){
        this.exchangeLibraryService.deleteBook(book).subscribe(_=>{})
      }
    })
  }
  isBooked(book:ExchangeLibrary){
    return book.status == BookStatus.RENTED
  }

}
