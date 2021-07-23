import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FamilleArticle } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-famille-detail',
  templateUrl: './famille-detail.page.html',
  styleUrls: ['./famille-detail.page.scss'],
})
export class FamilleDetailPage implements OnInit {

  private codeFamille : string;
  familleDetail : FamilleArticle
  familleForm = new FormGroup({
    code : new FormControl(),
    libelle : new FormControl()
  })

  constructor(private snap : ActivatedRoute,
              private articleservice : ArticlesService,
              private formbuilder : FormBuilder,
              private nav : NavController) { }

  ngOnInit() {
    this.loadData()
  }

  async loadData(){
    await this.getCode()
    await this.getDetail()
    this.loadFormValue()
  }

  initForm(){
    this.familleForm = this.formbuilder.group({

    })
  }

  private async getCode(){
    const code = await this.snap.snapshot.params['code'];
    this.codeFamille = code
  }

  private async getDetail(){
    const familleDetail = await this.articleservice.searchFamilleByCode(this.codeFamille);
    this.familleDetail = familleDetail
  }

  private loadFormValue(){
    this.familleForm.patchValue({
      code : this.familleDetail.code,
      libelle : this.familleDetail.libelle
    })
  }

  async onSubmit(){
    const formValue : FamilleArticle = await this.familleForm.value
    this.articleservice.setFamilleArticleRealDataToLocalStorage(formValue)
    this.nav.back()
  }

}
